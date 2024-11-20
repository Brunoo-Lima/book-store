-- CreateTable
CREATE TABLE "User" (
    "use_id" TEXT NOT NULL,
    "use_email" TEXT NOT NULL,
    "use_password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("use_id")
);

-- CreateTable
CREATE TABLE "Client" (
    "cli_id" TEXT NOT NULL,
    "cli_name" TEXT NOT NULL,
    "cli_dateOfBirth" TEXT NOT NULL,
    "cli_cpf" TEXT NOT NULL,
    "cli_status" TEXT NOT NULL,
    "cli_gender" TEXT NOT NULL,
    "cli_password" TEXT NOT NULL,
    "cli_email" TEXT NOT NULL,
    "cli_score" DOUBLE PRECISION NOT NULL,
    "cli_profilePurchase" TEXT NOT NULL,
    "cli_ranking" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("cli_id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "pho_id" TEXT NOT NULL,
    "pho_ddd" VARCHAR(3) NOT NULL,
    "pho_number" TEXT NOT NULL,
    "pho_numberCombine" TEXT NOT NULL,
    "pho_type_phone" TEXT NOT NULL,
    "fk_pho_cli_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("pho_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "add_id" TEXT NOT NULL,
    "add_name" TEXT NOT NULL,
    "add_streetName" TEXT NOT NULL,
    "add_publicPlace" TEXT NOT NULL,
    "add_number" TEXT NOT NULL,
    "add_cep" TEXT NOT NULL,
    "add_neighborhood" TEXT NOT NULL,
    "add_compostName" TEXT,
    "add_typeResidence" TEXT NOT NULL,
    "add_city" TEXT NOT NULL,
    "add_state" TEXT NOT NULL,
    "add_isBilling" BOOLEAN NOT NULL,
    "add_isDelivery" BOOLEAN NOT NULL,
    "fk_add_cli_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("add_id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "cre_id" TEXT NOT NULL,
    "cre_name" TEXT NOT NULL,
    "cre_number_cart" TEXT NOT NULL,
    "cre_cvv" VARCHAR(3) NOT NULL,
    "cre_dateMaturity" TEXT NOT NULL,
    "cre_preference" BOOLEAN NOT NULL,
    "cre_flag" TEXT NOT NULL,
    "fk_cre_cli_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("cre_id")
);

-- CreateTable
CREATE TABLE "Log" (
    "log_id" TEXT NOT NULL,
    "log_action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fk_log_cli_id" TEXT NOT NULL,
    "fk_log_use_id" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "pro_id" TEXT NOT NULL,
    "pro_name" TEXT NOT NULL,
    "pro_price" TEXT NOT NULL,
    "pro_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("pro_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "ite_id" TEXT NOT NULL,
    "ite_quantity" INTEGER NOT NULL,
    "ite_product_price" DOUBLE PRECISION NOT NULL,
    "fk_ite_pro_id" TEXT NOT NULL,
    "fk_ite_sal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("ite_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sal_id" TEXT NOT NULL,
    "sal_date_sale" TIMESTAMP(3) NOT NULL,
    "sal_date_update" TIMESTAMP(3) NOT NULL,
    "sal_status" TEXT NOT NULL,
    "fk_sal_cli_id" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sal_id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "del_id" TEXT NOT NULL,
    "del_status" TEXT NOT NULL,
    "fk_del_sal_id" TEXT NOT NULL,
    "del_date_initial" TIMESTAMP(3) NOT NULL,
    "del_date_final" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("del_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_use_email_key" ON "User"("use_email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cli_cpf_key" ON "Client"("cli_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cli_email_key" ON "Client"("cli_email");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_pho_numberCombine_key" ON "Phone"("pho_numberCombine");

-- CreateIndex
CREATE UNIQUE INDEX "Address_add_name_key" ON "Address"("add_name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_add_cep_add_name_add_number_add_streetName_key" ON "Address"("add_cep", "add_name", "add_number", "add_streetName");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_cre_number_cart_cre_cvv_cre_name_key" ON "CreditCard"("cre_number_cart", "cre_cvv", "cre_name");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_fk_del_sal_id_key" ON "Delivery"("fk_del_sal_id");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_fk_pho_cli_id_fkey" FOREIGN KEY ("fk_pho_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_fk_add_cli_id_fkey" FOREIGN KEY ("fk_add_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_fk_cre_cli_id_fkey" FOREIGN KEY ("fk_cre_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_fk_log_cli_id_fkey" FOREIGN KEY ("fk_log_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_fk_log_use_id_fkey" FOREIGN KEY ("fk_log_use_id") REFERENCES "User"("use_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_fk_ite_pro_id_fkey" FOREIGN KEY ("fk_ite_pro_id") REFERENCES "Product"("pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_fk_ite_sal_id_fkey" FOREIGN KEY ("fk_ite_sal_id") REFERENCES "Sale"("sal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fk_sal_cli_id_fkey" FOREIGN KEY ("fk_sal_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_fk_del_sal_id_fkey" FOREIGN KEY ("fk_del_sal_id") REFERENCES "Sale"("sal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
