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

    UNIQUE INDEX `Address_add_name_key`(`add_name`),
    PRIMARY KEY (`add_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditCart` (
    `cre_id` VARCHAR(191) NOT NULL,
    `cre_name` VARCHAR(191) NOT NULL,
    `cre_number_cart` VARCHAR(191) NOT NULL,
    `cre_cvv` VARCHAR(3) NOT NULL,
    `cre_dateMaturity` VARCHAR(191) NOT NULL,
    `cre_preference` BOOLEAN NOT NULL,
    `cre_flag` VARCHAR(191) NOT NULL,
    `fk_cre_cli_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `log_id` VARCHAR(191) NOT NULL,
    `log_action` VARCHAR(191) NOT NULL,
    `log_updatedFields` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `fk_log_cli_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_fk_pho_cli_id_fkey` FOREIGN KEY (`fk_pho_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_fk_add_cli_id_fkey` FOREIGN KEY (`fk_add_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditCart` ADD CONSTRAINT `CreditCart_fk_cre_cli_id_fkey` FOREIGN KEY (`fk_cre_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_fk_log_cli_id_fkey` FOREIGN KEY (`fk_log_cli_id`) REFERENCES `Client`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
