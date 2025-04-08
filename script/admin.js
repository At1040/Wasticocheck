// Admin Authentication and Dashboard JavaScript

// Admin data storage (in a real application, this would be handled by a backend)
let admins = JSON.parse(localStorage.getItem('admins')) || [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'Admin User',
        role: 'superadmin',
        lastLogin: null
    }
];
let currentAdmin = JSON.parse(localStorage.getItem('currentAdmin')) || null;

// Admin login
function adminLogin(username, password, twoFactorCode) {
    // In a real application, this would be handled by a backend
    const admin = admins.find(admin => 
        admin.username === username && 
        admin.password === password
    );

    if (!admin) {
        return { success: false, message: 'Invalid username or password' };
    }

    // Verify 2FA (mock verification)
    if (twoFactorCode !== '123456') {
        return { success: false, message: 'Invalid 2FA code' };
    }

    // Update last login
    admin.lastLogin = new Date().toISOString();
    localStorage.setItem('admins', JSON.stringify(admins));

    // Set current admin
    currentAdmin = admin;
    localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));

    return { success: true, message: 'Login successful' };
}

// Admin logout
function adminLogout() {
    currentAdmin = null;
    localStorage.removeItem('currentAdmin');
    return { success: true, message: 'Logged out successfully' };
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return currentAdmin !== null;
}

// Get current admin
function getCurrentAdmin() {
    return currentAdmin;
}

// Load dashboard statistics
function loadDashboardStats() {
    // In a real application, this would fetch from an API
    return {
        totalOrders: 245,
        revenue: 12450,
        newCustomers: 45,
        prescriptions: 78,
        orderTrend: '+12%',
        revenueTrend: '+8%',
        customerTrend: '+5%',
        prescriptionTrend: '-3%'
    };
}

// Load recent orders
function loadRecentOrders() {
    // In a real application, this would fetch from an API
    return [
        {
            id: '#ORD-001',
            customer: 'John Doe',
            date: '2024-03-15',
            amount: 150.00,
            status: 'completed'
        },
        {
            id: '#ORD-002',
            customer: 'Jane Smith',
            date: '2024-03-14',
            amount: 85.50,
            status: 'pending'
        },
        {
            id: '#ORD-003',
            customer: 'Mike Johnson',
            date: '2024-03-14',
            amount: 210.75,
            status: 'processing'
        }
    ];
}

// Load recent prescriptions
function loadRecentPrescriptions() {
    // In a real application, this would fetch from an API
    return [
        {
            id: '#PRS-001',
            patient: 'Sarah Wilson',
            doctor: 'Dr. Brown',
            date: '2024-03-15',
            status: 'approved'
        },
        {
            id: '#PRS-002',
            patient: 'David Lee',
            doctor: 'Dr. Smith',
            date: '2024-03-14',
            status: 'pending'
        },
        {
            id: '#PRS-003',
            patient: 'Emily Davis',
            doctor: 'Dr. Johnson',
            date: '2024-03-14',
            status: 'processing'
        }
    ];
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    // In a real application, this would update in a database
    return { success: true, message: 'Order status updated' };
}

// Update prescription status
function updatePrescriptionStatus(prescriptionId, newStatus) {
    // In a real application, this would update in a database
    return { success: true, message: 'Prescription status updated' };
}

// Search functionality
function searchData(query) {
    // In a real application, this would search in a database
    const orders = loadRecentOrders();
    const prescriptions = loadRecentPrescriptions();

    const searchResults = {
        orders: orders.filter(order => 
            Object.values(order).some(value => 
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        ),
        prescriptions: prescriptions.filter(prescription => 
            Object.values(prescription).some(value => 
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        )
    };

    return searchResults;
}

// Filter data by date
function filterDataByDate(dateRange) {
    // In a real application, this would filter from a database
    const stats = loadDashboardStats();
    const orders = loadRecentOrders();
    const prescriptions = loadRecentPrescriptions();

    return {
        stats,
        orders,
        prescriptions
    };
}

// Export functions for use in other files
window.admin = {
    adminLogin,
    adminLogout,
    isAdminLoggedIn,
    getCurrentAdmin,
    loadDashboardStats,
    loadRecentOrders,
    loadRecentPrescriptions,
    updateOrderStatus,
    updatePrescriptionStatus,
    searchData,
    filterDataByDate
}; 