
export enum AuthPatterns {
  USER_REGISTER = 'USER_REGISTER',
  USER_LOGIN = 'USER_LOGIN',
  AUTH_VALIDATE = 'AUTH_VALIDATE',
}

export enum InventoryPatterns {
  INV_CREATE = 'INV_CREATE',
  INV_FIND_ALL = 'INV_FIND_ALL',
  INV_FIND_ONE = 'INV_FIND_ONE',
  INV_UPDATE = 'INV_UPDATE',
  INV_DELETE = 'INV_DELETE',
  INV_UPDATE_STOCK = 'INV_UPDATE_STOCK',
}

export enum SupplierPatterns {
  SUP_CREATE = 'SUP_CREATE',
  SUP_FIND_ALL = 'SUP_FIND_ALL',
  SUP_FIND_ONE = 'SUP_FIND_ONE',
  SUP_UPDATE = 'SUP_UPDATE',
  SUP_DELETE = 'SUP_DELETE',
}

// Clientes
export enum CustomerPatterns {
  CUST_CREATE = 'CUST_CREATE',
  CUST_FIND_ALL = 'CUST_FIND_ALL',
  CUST_FIND_ONE = 'CUST_FIND_ONE',
  CUST_UPDATE = 'CUST_UPDATE',
  CUST_DELETE = 'CUST_DELETE',
}

export enum BillingPatterns {
  BILL_CREATE = 'billing.create',
  BILL_RETURN = 'billing.return',
}
