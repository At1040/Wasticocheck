// User Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'user-login.html';
        return;
    }

    // Dashboard elements
    const userInfo = document.getElementById('user-info');
    const orderHistory = document.getElementById('order-history');
    const prescriptionHistory = document.getElementById('prescription-history');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');

    // Load user data
    loadUserData();

    // Event listeners
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', showEditProfileModal);
    }

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', showChangePasswordModal);
    }

    // Load user data
    function loadUserData() {
        // Update user info
        updateUserInfo();
        
        // Load orders
        loadOrders();
        
        // Load prescriptions
        loadPrescriptions();
    }

    function updateUserInfo() {
        userInfo.innerHTML = `
            <div class="info-card">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> ${currentUser.name}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Member Since:</strong> ${new Date(currentUser.createdAt).toLocaleDateString()}</p>
            </div>
        `;
    }

    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.userId === currentUser.id);

        if (userOrders.length === 0) {
            orderHistory.innerHTML = '<p>No orders found.</p>';
            return;
        }

        orderHistory.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${userOrders.map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${new Date(order.date).toLocaleDateString()}</td>
                            <td>${order.items.length}</td>
                            <td>$${order.total.toFixed(2)}</td>
                            <td>${order.status}</td>
                            <td>
                                <button class="btn-view" onclick="viewOrder(${order.id})">View</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function loadPrescriptions() {
        const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
        const userPrescriptions = prescriptions.filter(p => p.userId === currentUser.id);

        if (userPrescriptions.length === 0) {
            prescriptionHistory.innerHTML = '<p>No prescriptions found.</p>';
            return;
        }

        prescriptionHistory.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Prescription ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${userPrescriptions.map(prescription => `
                        <tr>
                            <td>${prescription.id}</td>
                            <td>${new Date(prescription.date).toLocaleDateString()}</td>
                            <td>${prescription.status}</td>
                            <td>
                                <button class="btn-view" onclick="viewPrescription(${prescription.id})">View</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Modal functions
    function showEditProfileModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Edit Profile</h2>
                <form id="edit-profile-form">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value="${currentUser.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value="${currentUser.email}" required>
                    </div>
                    <button type="submit" class="btn-save">Save Changes</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close').onclick = function() {
            modal.remove();
        };

        modal.querySelector('#edit-profile-form').onsubmit = function(e) {
            e.preventDefault();
            saveProfileChanges();
            modal.remove();
        };
    }

    function showChangePasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Change Password</h2>
                <form id="change-password-form">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" name="currentPassword" required>
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" name="newPassword" required>
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" name="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn-save">Change Password</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close').onclick = function() {
            modal.remove();
        };

        modal.querySelector('#change-password-form').onsubmit = function(e) {
            e.preventDefault();
            changePassword();
            modal.remove();
        };
    }

    // Save profile changes
    function saveProfileChanges() {
        const form = document.querySelector('#edit-profile-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Update current user
        currentUser.name = data.name;
        currentUser.email = data.email;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update users list
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data };
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Update UI
        updateUserInfo();
        showSuccess('Profile updated successfully!');
    }

    // Change password
    function changePassword() {
        const form = document.querySelector('#change-password-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate current password
        if (data.currentPassword !== currentUser.password) {
            showError('Current password is incorrect');
            return;
        }

        // Validate new password
        if (data.newPassword !== data.confirmPassword) {
            showError('New passwords do not match');
            return;
        }

        // Update password
        currentUser.password = data.newPassword;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update users list
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].password = data.newPassword;
            localStorage.setItem('users', JSON.stringify(users));
        }

        showSuccess('Password changed successfully!');
    }

    // View order details
    window.viewOrder = function(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const order = orders.find(o => o.id === orderId);

        if (order) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Order Details</h2>
                    <div class="order-details">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                        <h3>Items:</h3>
                        <ul>
                            ${order.items.map(item => `
                                <li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.close').onclick = function() {
                modal.remove();
            };
        }
    };

    // View prescription details
    window.viewPrescription = function(prescriptionId) {
        const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
        const prescription = prescriptions.find(p => p.id === prescriptionId);

        if (prescription) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Prescription Details</h2>
                    <div class="prescription-details">
                        <p><strong>Prescription ID:</strong> ${prescription.id}</p>
                        <p><strong>Date:</strong> ${new Date(prescription.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${prescription.status}</p>
                        <p><strong>Doctor:</strong> ${prescription.doctor}</p>
                        <p><strong>Notes:</strong> ${prescription.notes}</p>
                        <div class="prescription-image">
                            <img src="${prescription.image}" alt="Prescription">
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.close').onclick = function() {
                modal.remove();
            };
        }
    };

    // Utility functions
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.querySelector('.dashboard-container').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        document.querySelector('.dashboard-container').prepend(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
    }
}); 