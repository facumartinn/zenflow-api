-- Creación de la tabla Tenants
CREATE TABLE `Tenants` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `contact_email` VARCHAR(255),
    `contact_phone` VARCHAR(255),
    `address` TEXT,
    `billing_address` TEXT,
    `payment_method` VARCHAR(255),
    `status` VARCHAR(50) DEFAULT 'activo',
    `registration_date` DATETIME,
    `last_login_date` DATETIME,
    `subscription_plan` VARCHAR(255),
    `custom_settings` LONGTEXT,
    `api_key` VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Creación de la tabla States
CREATE TABLE `States` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla Roles
CREATE TABLE `Roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla Products
CREATE TABLE `Products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla Warehouses
CREATE TABLE `Warehouses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255),
    `size` INT,
    `type` VARCHAR(100),
    `manager` VARCHAR(255),
    `contact_info` VARCHAR(255),
    `operating_hours` VARCHAR(100),
    `temperature_control` BOOLEAN DEFAULT FALSE,
    `security_features` TEXT,
    `inventory_types` VARCHAR(255),
    `facility_conditions` TEXT,
    `emergency_contact` VARCHAR(255),
    `custom_attributes` LONGTEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla Users
CREATE TABLE `Users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `barcode` INT NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `warehouse_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`),
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`),
    FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla SubstitutionPreferences
CREATE TABLE `SubstitutionPreferences` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla Orders
CREATE TABLE `Orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `state_id` INT,
    `amount` DECIMAL(10,2) NOT NULL,
    `amount_picked` DECIMAL(10,2),
    `user_id` INT,
    `assembly_date` DATETIME,
    `assembly_schedule` DATETIME,
    `substitution_preference_id` INT,
    `internal_comment` TEXT,
    `tenant_id` INT NOT NULL,
    `warehouse_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`state_id`) REFERENCES `States` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`substitution_preference_id`) REFERENCES `SubstitutionPreferences` (`id`),
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`),
    FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla OrderDetails
CREATE TABLE `OrderDetails` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `quantityPicked` INT,
    `tenant_id` INT NOT NULL,
    `warehouse_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`),
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`),
    FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla OrderPositions
CREATE TABLE `OrderPositions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NOT NULL,
    `tenant_id` INT NOT NULL,
    `warehouse_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`),
    FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses` (`id`)
) ENGINE=InnoDB;

-- Creación de la tabla OrderStates
CREATE TABLE `OrderStates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `state_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `creationDate` DATETIME NOT NULL,
    `tenant_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
    FOREIGN KEY (`state_id`) REFERENCES `States` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id`)
) ENGINE=InnoDB;

-- Indices para la tabla States
CREATE INDEX `idx_states_tenant_id` ON `States` (`tenant_id`);

-- Indices para la tabla Roles
CREATE INDEX `idx_roles_tenant_id` ON `Roles` (`tenant_id`);

-- Indices para la tabla Products
CREATE INDEX `idx_products_tenant_id` ON `Products` (`tenant_id`);

-- Indices para la tabla Users
CREATE INDEX `idx_users_role_id` ON `Users` (`role_id`);
CREATE INDEX `idx_users_tenant_id` ON `Users` (`tenant_id`);
CREATE INDEX `idx_users_warehouse_id` ON `Users` (`warehouse_id`);

-- Indices para la tabla Orders
CREATE INDEX `idx_orders_state_id` ON `Orders` (`state_id`);
CREATE INDEX `idx_orders_user_id` ON `Orders` (`user_id`);
CREATE INDEX `idx_orders_substitution_preference_id` ON `Orders` (`substitution_preference_id`);
CREATE INDEX `idx_orders_tenant_id` ON `Orders` (`tenant_id`);
CREATE INDEX `idx_orders_warehouse_id` ON `Orders` (`warehouse_id`);

-- Indices para la tabla OrderDetails
CREATE INDEX `idx_orderdetails_order_id` ON `OrderDetails` (`order_id`);
CREATE INDEX `idx_orderdetails_product_id` ON `OrderDetails` (`product_id`);
CREATE INDEX `idx_orderdetails_tenant_id` ON `OrderDetails` (`tenant_id`);
CREATE INDEX `idx_orderdetails_warehouse_id` ON `OrderDetails` (`warehouse_id`);

-- Indices para la tabla OrderPositions
CREATE INDEX `idx_orderpositions_order_id` ON `OrderPositions` (`order_id`);
CREATE INDEX `idx_orderpositions_tenant_id` ON `OrderPositions` (`tenant_id`);
CREATE INDEX `idx_orderpositions_warehouse_id` ON `OrderPositions` (`warehouse_id`);

-- Indices para la tabla OrderStates
CREATE INDEX `idx_orderstates_order_id` ON `OrderStates` (`order_id`);
CREATE INDEX `idx_orderstates_state_id` ON `OrderStates` (`state_id`);
CREATE INDEX `idx_orderstates_user_id` ON `OrderStates` (`user_id`);
CREATE INDEX `idx_orderstates_tenant_id` ON `OrderStates` (`tenant_id`);

-- Indices para la tabla SubstitutionPreferences
CREATE INDEX `idx_substitutionpreferences_tenant_id` ON `SubstitutionPreferences` (`tenant_id`);

-- Indices para la tabla Warehouses
CREATE INDEX `idx_warehouses_tenant_id` ON `Warehouses` (`tenant_id`);
