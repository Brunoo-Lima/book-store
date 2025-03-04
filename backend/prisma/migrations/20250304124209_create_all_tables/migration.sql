-- CreateTable
CREATE TABLE "User" (
    "use_id" TEXT NOT NULL,
    "use_email" TEXT NOT NULL,
    "use_is_admin" BOOLEAN NOT NULL,
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
CREATE TABLE "ChangeLog" (
    "log_id" TEXT NOT NULL,
    "log_action" TEXT NOT NULL,
    "log_table" TEXT NOT NULL,
    "log_description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fk_log_use_id" TEXT NOT NULL,

    CONSTRAINT "ChangeLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "boo_id" TEXT NOT NULL,
    "boo_title" TEXT NOT NULL,
    "boo_year" TEXT NOT NULL,
    "boo_edition" TEXT NOT NULL,
    "boo_isbn" TEXT NOT NULL,
    "boo_page_numbers" INTEGER NOT NULL,
    "boo_synopses" TEXT NOT NULL,
    "boo_height" DOUBLE PRECISION NOT NULL,
    "boo_width" DOUBLE PRECISION NOT NULL,
    "boo_weight" DOUBLE PRECISION NOT NULL,
    "boo_depth" DOUBLE PRECISION NOT NULL,
    "fk_boo_pre_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("boo_id")
);

-- CreateTable
CREATE TABLE "PricingGroup" (
    "pre_id" TEXT NOT NULL,
    "pre_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingGroup_pkey" PRIMARY KEY ("pre_id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "pub_id" TEXT NOT NULL,
    "pub_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("pub_id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "cte_id" TEXT NOT NULL,
    "cte_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("cte_id")
);

-- CreateTable
CREATE TABLE "Author" (
    "aut_id" TEXT NOT NULL,
    "aut_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("aut_id")
);

-- CreateTable
CREATE TABLE "ItemStock" (
    "ito_id" TEXT NOT NULL,
    "ito_quantity" INTEGER NOT NULL,
    "fk_ito_boo_id" TEXT NOT NULL,

    CONSTRAINT "ItemStock_pkey" PRIMARY KEY ("ito_id")
);

-- CreateTable
CREATE TABLE "ItemOrder" (
    "ite_id" TEXT NOT NULL,
    "ite_quantity" INTEGER NOT NULL,
    "ite_product_price" DOUBLE PRECISION NOT NULL,
    "fk_ite_boo_id" TEXT NOT NULL,
    "fk_ite_sal_id" TEXT NOT NULL,
    "fk_ite_crt_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemOrder_pkey" PRIMARY KEY ("ite_id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "crt_id" TEXT NOT NULL,
    "fk_crt_sal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("crt_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "pay_id" TEXT NOT NULL,
    "pay_method" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("pay_id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "cou_id" TEXT NOT NULL,
    "cou_code" TEXT NOT NULL,
    "cou_type" TEXT NOT NULL,
    "cou_discount" DOUBLE PRECISION NOT NULL,
    "cou_is_percent" BOOLEAN NOT NULL,
    "cou_valid_until" TIMESTAMP(3) NOT NULL,
    "cou_min_value" DOUBLE PRECISION,
    "cou_status" TEXT NOT NULL,
    "fk_cou_ite_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("cou_id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "exc_id" TEXT NOT NULL,
    "exc_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exc_status" TEXT NOT NULL,
    "exc_value" DOUBLE PRECISION NOT NULL,
    "fk_exc_ite_id" TEXT NOT NULL,
    "fk_exc_sal_id" TEXT NOT NULL,
    "fk_exc_cou_id" TEXT,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("exc_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sal_id" TEXT NOT NULL,
    "sal_date_sale" TIMESTAMP(3) NOT NULL,
    "sal_date_update" TIMESTAMP(3) NOT NULL,
    "sal_status" TEXT NOT NULL,
    "fk_sal_cou_id" TEXT NOT NULL,
    "fk_sal_pay_id" TEXT NOT NULL,
    "fk_sal_cli_id" TEXT NOT NULL,
    "fk_sal_crt_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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

-- CreateTable
CREATE TABLE "_BookToCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToPublisher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemOrderToItemStock" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaymentToSale" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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
CREATE UNIQUE INDEX "Book_fk_boo_pre_id_key" ON "Book"("fk_boo_pre_id");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_pub_name_key" ON "Publisher"("pub_name");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_cte_name_key" ON "Categories"("cte_name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_aut_name_key" ON "Author"("aut_name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_fk_ito_boo_id_key" ON "ItemStock"("fk_ito_boo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_fk_crt_sal_id_key" ON "Cart"("fk_crt_sal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_cou_code_key" ON "Coupons"("cou_code");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_fk_cou_ite_id_key" ON "Coupons"("fk_cou_ite_id");

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_fk_exc_ite_id_key" ON "Exchange"("fk_exc_ite_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_fk_sal_pay_id_key" ON "Sale"("fk_sal_pay_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_fk_sal_crt_id_key" ON "Sale"("fk_sal_crt_id");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_fk_del_sal_id_key" ON "Delivery"("fk_del_sal_id");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCategories_AB_unique" ON "_BookToCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCategories_B_index" ON "_BookToCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToPublisher_AB_unique" ON "_BookToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToPublisher_B_index" ON "_BookToPublisher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemOrderToItemStock_AB_unique" ON "_ItemOrderToItemStock"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemOrderToItemStock_B_index" ON "_ItemOrderToItemStock"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentToSale_AB_unique" ON "_PaymentToSale"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentToSale_B_index" ON "_PaymentToSale"("B");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_fk_pho_cli_id_fkey" FOREIGN KEY ("fk_pho_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_fk_add_cli_id_fkey" FOREIGN KEY ("fk_add_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_fk_cre_cli_id_fkey" FOREIGN KEY ("fk_cre_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeLog" ADD CONSTRAINT "ChangeLog_fk_log_use_id_fkey" FOREIGN KEY ("fk_log_use_id") REFERENCES "User"("use_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_fk_boo_pre_id_fkey" FOREIGN KEY ("fk_boo_pre_id") REFERENCES "PricingGroup"("pre_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_fk_ito_boo_id_fkey" FOREIGN KEY ("fk_ito_boo_id") REFERENCES "Book"("boo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOrder" ADD CONSTRAINT "ItemOrder_fk_ite_crt_id_fkey" FOREIGN KEY ("fk_ite_crt_id") REFERENCES "Cart"("crt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupons" ADD CONSTRAINT "Coupons_fk_cou_ite_id_fkey" FOREIGN KEY ("fk_cou_ite_id") REFERENCES "ItemOrder"("ite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_fk_exc_ite_id_fkey" FOREIGN KEY ("fk_exc_ite_id") REFERENCES "ItemOrder"("ite_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fk_sal_cli_id_fkey" FOREIGN KEY ("fk_sal_cli_id") REFERENCES "Client"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fk_sal_crt_id_fkey" FOREIGN KEY ("fk_sal_crt_id") REFERENCES "Cart"("crt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_fk_del_sal_id_fkey" FOREIGN KEY ("fk_del_sal_id") REFERENCES "Sale"("sal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategories" ADD CONSTRAINT "_BookToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("boo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategories" ADD CONSTRAINT "_BookToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Categories"("cte_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("boo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("pub_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("aut_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("boo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemOrderToItemStock" ADD CONSTRAINT "_ItemOrderToItemStock_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemOrder"("ite_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemOrderToItemStock" ADD CONSTRAINT "_ItemOrderToItemStock_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemStock"("ito_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToSale" ADD CONSTRAINT "_PaymentToSale_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("pay_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToSale" ADD CONSTRAINT "_PaymentToSale_B_fkey" FOREIGN KEY ("B") REFERENCES "Sale"("sal_id") ON DELETE CASCADE ON UPDATE CASCADE;
