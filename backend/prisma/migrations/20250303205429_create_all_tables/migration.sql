-- CreateTable
CREATE TABLE `User` (
    `use_id` VARCHAR(191) NOT NULL,
    `use_email` VARCHAR(191) NOT NULL,
    `use_is_admin` BOOLEAN NOT NULL,
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
CREATE TABLE `ChangeLog` (
    `log_id` VARCHAR(191) NOT NULL,
    `log_action` VARCHAR(191) NOT NULL,
    `log_table` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `fk_log_use_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `boo_id` VARCHAR(191) NOT NULL,
    `boo_title` VARCHAR(191) NOT NULL,
    `boo_year` VARCHAR(191) NOT NULL,
    `boo_edition` VARCHAR(191) NOT NULL,
    `boo_isbn` VARCHAR(191) NOT NULL,
    `boo_page_numbers` INTEGER NOT NULL,
    `boo_synopses` VARCHAR(191) NOT NULL,
    `boo_height` DOUBLE NOT NULL,
    `boo_width` DOUBLE NOT NULL,
    `boo_weight` DOUBLE NOT NULL,
    `boo_depth` DOUBLE NOT NULL,
    `fk_boo_pro_id` VARCHAR(191) NOT NULL,
    `fk_boo_pre_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `itemOrderIte_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Book_fk_boo_pro_id_key`(`fk_boo_pro_id`),
    UNIQUE INDEX `Book_fk_boo_pre_id_key`(`fk_boo_pre_id`),
    PRIMARY KEY (`boo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PricingGroup` (
    `pre_id` VARCHAR(191) NOT NULL,
    `pre_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publisher` (
    `pub_id` VARCHAR(191) NOT NULL,
    `pub_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Publisher_pub_name_key`(`pub_name`),
    PRIMARY KEY (`pub_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `cte_id` VARCHAR(191) NOT NULL,
    `cte_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categories_cte_name_key`(`cte_name`),
    PRIMARY KEY (`cte_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `aut_id` VARCHAR(191) NOT NULL,
    `aut_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Author_aut_name_key`(`aut_name`),
    PRIMARY KEY (`aut_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemStock` (
    `ito_id` VARCHAR(191) NOT NULL,
    `ito_quantity` INTEGER NOT NULL,
    `fk_ito_boo_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ItemStock_fk_ito_boo_id_key`(`fk_ito_boo_id`),
    PRIMARY KEY (`ito_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemOrder` (
    `ite_id` VARCHAR(191) NOT NULL,
    `ite_quantity` INTEGER NOT NULL,
    `ite_product_price` DOUBLE NOT NULL,
    `fk_ite_boo_id` VARCHAR(191) NOT NULL,
    `fk_ite_sal_id` VARCHAR(191) NOT NULL,
    `fk_ite_crt_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `crt_id` VARCHAR(191) NOT NULL,
    `fk_crt_sal_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cart_fk_crt_sal_id_key`(`fk_crt_sal_id`),
    PRIMARY KEY (`crt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `pay_id` VARCHAR(191) NOT NULL,
    `pay_method` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pay_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupons` (
    `cou_id` VARCHAR(191) NOT NULL,
    `cou_code` VARCHAR(191) NOT NULL,
    `cou_type` VARCHAR(191) NOT NULL,
    `cou_discount` DOUBLE NOT NULL,
    `cou_is_percent` BOOLEAN NOT NULL,
    `cou_valid_until` DATETIME(3) NOT NULL,
    `cou_min_value` DOUBLE NULL,
    `cou_status` VARCHAR(191) NOT NULL,
    `fk_cou_ite_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Coupons_cou_code_key`(`cou_code`),
    UNIQUE INDEX `Coupons_fk_cou_ite_id_key`(`fk_cou_ite_id`),
    PRIMARY KEY (`cou_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exchange` (
    `exc_id` VARCHAR(191) NOT NULL,
    `exc_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exc_status` VARCHAR(191) NOT NULL,
    `exc_value` DOUBLE NOT NULL,
    `fk_exc_ite_id` VARCHAR(191) NOT NULL,
    `fk_exc_sal_id` VARCHAR(191) NOT NULL,
    `fk_exc_cou_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Exchange_fk_exc_ite_id_key`(`fk_exc_ite_id`),
    PRIMARY KEY (`exc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `sal_id` VARCHAR(191) NOT NULL,
    `sal_date_sale` DATETIME(3) NOT NULL,
    `sal_date_update` DATETIME(3) NOT NULL,
    `sal_status` VARCHAR(191) NOT NULL,
    `fk_sal_cou_id` VARCHAR(191) NOT NULL,
    `fk_sal_pay_id` VARCHAR(191) NOT NULL,
    `fk_sal_cli_id` VARCHAR(191) NOT NULL,
    `fk_sal_crt_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Sale_fk_sal_pay_id_key`(`fk_sal_pay_id`),
    UNIQUE INDEX `Sale_fk_sal_crt_id_key`(`fk_sal_crt_id`),
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

-- CreateTable
CREATE TABLE `_BookToCategories` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BookToCategories_AB_unique`(`A`, `B`),
    INDEX `_BookToCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToPublisher` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BookToPublisher_AB_unique`(`A`, `B`),
    INDEX `_BookToPublisher_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AuthorToBook` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AuthorToBook_AB_unique`(`A`, `B`),
    INDEX `_AuthorToBook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PaymentToSale` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PaymentToSale_AB_unique`(`A`, `B`),
    INDEX `_PaymentToSale_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_fk_pho_cli_id_fkey` FOREIGN KEY (`fk_pho_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_fk_add_cli_id_fkey` FOREIGN KEY (`fk_add_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditCard` ADD CONSTRAINT `CreditCard_fk_cre_cli_id_fkey` FOREIGN KEY (`fk_cre_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChangeLog` ADD CONSTRAINT `ChangeLog_fk_log_use_id_fkey` FOREIGN KEY (`fk_log_use_id`) REFERENCES `User`(`use_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_fk_boo_pre_id_fkey` FOREIGN KEY (`fk_boo_pre_id`) REFERENCES `PricingGroup`(`pre_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_itemOrderIte_id_fkey` FOREIGN KEY (`itemOrderIte_id`) REFERENCES `ItemOrder`(`ite_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemStock` ADD CONSTRAINT `ItemStock_fk_ito_boo_id_fkey` FOREIGN KEY (`fk_ito_boo_id`) REFERENCES `Book`(`boo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemOrder` ADD CONSTRAINT `ItemOrder_fk_ite_crt_id_fkey` FOREIGN KEY (`fk_ite_crt_id`) REFERENCES `Cart`(`crt_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupons` ADD CONSTRAINT `Coupons_fk_cou_ite_id_fkey` FOREIGN KEY (`fk_cou_ite_id`) REFERENCES `ItemOrder`(`ite_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exchange` ADD CONSTRAINT `Exchange_fk_exc_ite_id_fkey` FOREIGN KEY (`fk_exc_ite_id`) REFERENCES `ItemOrder`(`ite_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_fk_sal_cli_id_fkey` FOREIGN KEY (`fk_sal_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_fk_sal_crt_id_fkey` FOREIGN KEY (`fk_sal_crt_id`) REFERENCES `Cart`(`crt_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_fk_del_sal_id_fkey` FOREIGN KEY (`fk_del_sal_id`) REFERENCES `Sale`(`sal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCategories` ADD CONSTRAINT `_BookToCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`boo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCategories` ADD CONSTRAINT `_BookToCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Categories`(`cte_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToPublisher` ADD CONSTRAINT `_BookToPublisher_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`boo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToPublisher` ADD CONSTRAINT `_BookToPublisher_B_fkey` FOREIGN KEY (`B`) REFERENCES `Publisher`(`pub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD CONSTRAINT `_AuthorToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author`(`aut_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD CONSTRAINT `_AuthorToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Book`(`boo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaymentToSale` ADD CONSTRAINT `_PaymentToSale_A_fkey` FOREIGN KEY (`A`) REFERENCES `Payment`(`pay_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaymentToSale` ADD CONSTRAINT `_PaymentToSale_B_fkey` FOREIGN KEY (`B`) REFERENCES `Sale`(`sal_id`) ON DELETE CASCADE ON UPDATE CASCADE;
