-- CreateTable
CREATE TABLE `Client` (
    `cli_id` VARCHAR(191) NOT NULL,
    `cli_name` VARCHAR(191) NOT NULL,
    `cli_dateOfBirth` VARCHAR(191) NOT NULL,
    `cli_cpf` VARCHAR(191) NOT NULL,
    `cli_status` VARCHAR(191) NOT NULL,
    `cli_gender` VARCHAR(191) NOT NULL,
    `cli_score` DOUBLE NOT NULL,
    `cli_profilePurchase` VARCHAR(191) NOT NULL,
    `fk_cli_cla_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_cli_cpf_key`(`cli_cpf`),
    UNIQUE INDEX `Client_fk_cli_cla_id_key`(`fk_cli_cla_id`),
    PRIMARY KEY (`cli_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phone` (
    `pho_id` VARCHAR(191) NOT NULL,
    `pho_ddd` VARCHAR(3) NOT NULL,
    `pho_number` VARCHAR(191) NOT NULL,
    `pho_type_phone` VARCHAR(191) NOT NULL,
    `fk_pho_cli_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pho_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `add_id` VARCHAR(191) NOT NULL,
    `add_streetName` VARCHAR(191) NOT NULL,
    `add_publicPlace` VARCHAR(191) NOT NULL,
    `add_number` VARCHAR(191) NOT NULL,
    `add_cep` VARCHAR(191) NOT NULL,
    `add_neighborhood` VARCHAR(191) NOT NULL,
    `add_compostName` VARCHAR(191) NULL,
    `add_typeResidence` VARCHAR(191) NOT NULL,
    `add_city` VARCHAR(191) NOT NULL,
    `add_state` VARCHAR(191) NOT NULL,
    `add_country` VARCHAR(191) NOT NULL,
    `fk_add_cli_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`add_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `sal_id` VARCHAR(191) NOT NULL,
    `fk_sal_ite_id` VARCHAR(191) NOT NULL,
    `fk_sal_cli_id` VARCHAR(191) NOT NULL,
    `fk_sal_his_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sales_fk_sal_his_id_key`(`fk_sal_his_id`),
    PRIMARY KEY (`sal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `ite_id` VARCHAR(191) NOT NULL,
    `ite_quantitySales` INTEGER NOT NULL,
    `fk_ite_sal_id` VARCHAR(191) NOT NULL,
    `fk_ite_pro_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Item_fk_ite_sal_id_key`(`fk_ite_sal_id`),
    UNIQUE INDEX `Item_fk_ite_pro_id_key`(`fk_ite_pro_id`),
    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `pro_id` VARCHAR(191) NOT NULL,
    `pro_price` DECIMAL(65, 30) NOT NULL,
    `pro_quantity` INTEGER NOT NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classification` (
    `cla_id` VARCHAR(191) NOT NULL,
    `fk_cla_ran_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cla_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditCart` (
    `cre_id` VARCHAR(191) NOT NULL,
    `cre_name` VARCHAR(191) NOT NULL,
    `cre_cvv` VARCHAR(3) NOT NULL,
    `cre_number_cart` VARCHAR(191) NOT NULL,
    `cre_dateMaturity` VARCHAR(191) NOT NULL,
    `cre_preference` BOOLEAN NOT NULL,
    `fk_cre_fla_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flag` (
    `fla_id` VARCHAR(191) NOT NULL,
    `fla_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`fla_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ranking` (
    `ran_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ran_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_fk_cli_cla_id_fkey` FOREIGN KEY (`fk_cli_cla_id`) REFERENCES `Classification`(`cla_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_fk_pho_cli_id_fkey` FOREIGN KEY (`fk_pho_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_fk_add_cli_id_fkey` FOREIGN KEY (`fk_add_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_fk_sal_cli_id_fkey` FOREIGN KEY (`fk_sal_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_fk_ite_pro_id_fkey` FOREIGN KEY (`fk_ite_pro_id`) REFERENCES `Product`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_fk_ite_sal_id_fkey` FOREIGN KEY (`fk_ite_sal_id`) REFERENCES `Sales`(`sal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classification` ADD CONSTRAINT `Classification_fk_cla_ran_id_fkey` FOREIGN KEY (`fk_cla_ran_id`) REFERENCES `Ranking`(`ran_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditCart` ADD CONSTRAINT `CreditCart_fk_cre_fla_id_fkey` FOREIGN KEY (`fk_cre_fla_id`) REFERENCES `Flag`(`fla_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
