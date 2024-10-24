-- CreateTable
CREATE TABLE `User` (
    `use_id` VARCHAR(191) NOT NULL,
    `use_email` VARCHAR(191) NOT NULL,
    `use_password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_use_email_key`(`use_email`),
    PRIMARY KEY (`use_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `cli_id` VARCHAR(191) NOT NULL,
    `cli_name` VARCHAR(191) NOT NULL,
    `cli_dateOfBirth` VARCHAR(191) NOT NULL,
    `cli_cpf` VARCHAR(191) NOT NULL,
    `cli_status` VARCHAR(191) NOT NULL,
    `cli_gender` VARCHAR(191) NOT NULL,
    `cli_password` VARCHAR(191) NOT NULL,
    `cli_email` VARCHAR(191) NOT NULL,
    `cli_score` DOUBLE NOT NULL,
    `cli_profilePurchase` VARCHAR(191) NOT NULL,
    `cli_ranking` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Client_cli_cpf_key`(`cli_cpf`),
    UNIQUE INDEX `Client_cli_email_key`(`cli_email`),
    PRIMARY KEY (`cli_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phone` (
    `pho_id` VARCHAR(191) NOT NULL,
    `pho_ddd` VARCHAR(3) NOT NULL,
    `pho_number` VARCHAR(191) NOT NULL,
    `pho_numberCombine` VARCHAR(191) NOT NULL,
    `pho_type_phone` VARCHAR(191) NOT NULL,
    `fk_pho_cli_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Phone_pho_numberCombine_key`(`pho_numberCombine`),
    PRIMARY KEY (`pho_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `add_id` VARCHAR(191) NOT NULL,
    `add_name` VARCHAR(191) NOT NULL,
    `add_streetName` VARCHAR(191) NOT NULL,
    `add_publicPlace` VARCHAR(191) NOT NULL,
    `add_number` VARCHAR(191) NOT NULL,
    `add_cep` VARCHAR(191) NOT NULL,
    `add_neighborhood` VARCHAR(191) NOT NULL,
    `add_compostName` VARCHAR(191) NULL,
    `add_typeResidence` VARCHAR(191) NOT NULL,
    `add_city` VARCHAR(191) NOT NULL,
    `add_state` VARCHAR(191) NOT NULL,
    `add_isBilling` BOOLEAN NOT NULL,
    `add_isDelivery` BOOLEAN NOT NULL,
    `fk_add_cli_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_add_name_key`(`add_name`),
    UNIQUE INDEX `Address_add_cep_add_name_add_number_add_streetName_key`(`add_cep`, `add_name`, `add_number`, `add_streetName`),
    PRIMARY KEY (`add_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditCard` (
    `cre_id` VARCHAR(191) NOT NULL,
    `cre_name` VARCHAR(191) NOT NULL,
    `cre_number_cart` VARCHAR(191) NOT NULL,
    `cre_cvv` VARCHAR(3) NOT NULL,
    `cre_dateMaturity` VARCHAR(191) NOT NULL,
    `cre_preference` BOOLEAN NOT NULL,
    `cre_flag` VARCHAR(191) NOT NULL,
    `fk_cre_cli_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CreditCard_cre_number_cart_cre_cvv_cre_name_key`(`cre_number_cart`, `cre_cvv`, `cre_name`),
    PRIMARY KEY (`cre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `log_id` VARCHAR(191) NOT NULL,
    `log_action` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `fk_log_cli_id` VARCHAR(191) NOT NULL,
    `fk_log_use_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `pro_id` VARCHAR(191) NOT NULL,
    `pro_name` VARCHAR(191) NOT NULL,
    `pro_price` VARCHAR(191) NOT NULL,
    `pro_quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `ite_id` VARCHAR(191) NOT NULL,
    `ite_quantity` INTEGER NOT NULL,
    `ite_product_price` DOUBLE NOT NULL,
    `fk_ite_pro_id` VARCHAR(191) NOT NULL,
    `fk_ite_sal_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `sal_id` VARCHAR(191) NOT NULL,
    `sal_date_sale` DATETIME(3) NOT NULL,
    `sal_date_update` DATETIME(3) NOT NULL,
    `sal_status` VARCHAR(191) NOT NULL,
    `fk_sal_cli_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `del_id` VARCHAR(191) NOT NULL,
    `del_status` VARCHAR(191) NOT NULL,
    `fk_del_sal_id` VARCHAR(191) NOT NULL,
    `del_date_initial` DATETIME(3) NOT NULL,
    `del_date_final` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Delivery_fk_del_sal_id_key`(`fk_del_sal_id`),
    PRIMARY KEY (`del_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_fk_pho_cli_id_fkey` FOREIGN KEY (`fk_pho_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_fk_add_cli_id_fkey` FOREIGN KEY (`fk_add_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditCard` ADD CONSTRAINT `CreditCard_fk_cre_cli_id_fkey` FOREIGN KEY (`fk_cre_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_fk_log_cli_id_fkey` FOREIGN KEY (`fk_log_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_fk_log_use_id_fkey` FOREIGN KEY (`fk_log_use_id`) REFERENCES `User`(`use_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_fk_ite_pro_id_fkey` FOREIGN KEY (`fk_ite_pro_id`) REFERENCES `Product`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_fk_ite_sal_id_fkey` FOREIGN KEY (`fk_ite_sal_id`) REFERENCES `Sale`(`sal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_fk_sal_cli_id_fkey` FOREIGN KEY (`fk_sal_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_fk_del_sal_id_fkey` FOREIGN KEY (`fk_del_sal_id`) REFERENCES `Sale`(`sal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
