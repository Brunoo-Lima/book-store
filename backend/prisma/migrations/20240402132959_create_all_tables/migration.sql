-- CreateTable
CREATE TABLE "users" (
    "use_id" TEXT NOT NULL,
    "use_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("use_id")
);

-- CreateTable
CREATE TABLE "books" (
    "boo_code" TEXT NOT NULL,
    "boo_title" TEXT NOT NULL,
    "boo_year" INTEGER NOT NULL,
    "boo_status" TEXT NOT NULL,
    "boo_justify_status" TEXT NOT NULL,
    "boo_category_change" TEXT NOT NULL,
    "boo_bar_code" TEXT NOT NULL,
    "boo_price_acquisition" DOUBLE PRECISION NOT NULL,
    "boo_edition" TEXT NOT NULL,
    "boo_ISBN" TEXT NOT NULL,
    "boo_pages" INTEGER NOT NULL,
    "boo_synopsis" TEXT NOT NULL,
    "boo_width" DOUBLE PRECISION NOT NULL,
    "boo_height" DOUBLE PRECISION NOT NULL,
    "boo_weight" DOUBLE PRECISION NOT NULL,
    "boo_depth" DOUBLE PRECISION NOT NULL,
    "fk_boo_author_id" TEXT NOT NULL,
    "fk_boo_pub_id" TEXT NOT NULL,
    "fk_boo_grp_id" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("boo_code")
);

-- CreateTable
CREATE TABLE "authors" (
    "aut_id" TEXT NOT NULL,
    "aut_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("aut_id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "pub_id" TEXT NOT NULL,
    "pub_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("pub_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "cte_id" TEXT NOT NULL,
    "cte_name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("cte_id")
);

-- CreateTable
CREATE TABLE "groups" (
    "grp_id" TEXT NOT NULL,
    "grp_type_pricing" TEXT NOT NULL,
    "grp_max_pricing" DOUBLE PRECISION NOT NULL,
    "grp_min_pricing" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("grp_id")
);

-- CreateTable
CREATE TABLE "logsChanged" (
    "log_id" TEXT NOT NULL,
    "fk_log_boo_code" TEXT NOT NULL,
    "fk_log_use_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logsChanged_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "stock" (
    "stk_id" TEXT NOT NULL,
    "stk_quantity" INTEGER NOT NULL,
    "fk_stk_boo_code" TEXT NOT NULL,
    "salesSal_id" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stk_id")
);

-- CreateTable
CREATE TABLE "booksPerCategory" (
    "bte_id" TEXT NOT NULL,
    "fk_bte_cte_id" TEXT NOT NULL,
    "fk_bte_boo_code" TEXT NOT NULL,

    CONSTRAINT "booksPerCategory_pkey" PRIMARY KEY ("bte_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_boo_ISBN_key" ON "books"("boo_ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_pub_name_key" ON "publishers"("pub_name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_cte_name_key" ON "categories"("cte_name");

-- CreateIndex
CREATE UNIQUE INDEX "groups_grp_type_pricing_key" ON "groups"("grp_type_pricing");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_fk_boo_author_id_fkey" FOREIGN KEY ("fk_boo_author_id") REFERENCES "authors"("aut_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_fk_boo_pub_id_fkey" FOREIGN KEY ("fk_boo_pub_id") REFERENCES "publishers"("pub_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_fk_boo_grp_id_fkey" FOREIGN KEY ("fk_boo_grp_id") REFERENCES "groups"("grp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logsChanged" ADD CONSTRAINT "logsChanged_fk_log_boo_code_fkey" FOREIGN KEY ("fk_log_boo_code") REFERENCES "books"("boo_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logsChanged" ADD CONSTRAINT "logsChanged_fk_log_use_id_fkey" FOREIGN KEY ("fk_log_use_id") REFERENCES "users"("use_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_fk_stk_boo_code_fkey" FOREIGN KEY ("fk_stk_boo_code") REFERENCES "books"("boo_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booksPerCategory" ADD CONSTRAINT "booksPerCategory_fk_bte_cte_id_fkey" FOREIGN KEY ("fk_bte_cte_id") REFERENCES "categories"("cte_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booksPerCategory" ADD CONSTRAINT "booksPerCategory_fk_bte_boo_code_fkey" FOREIGN KEY ("fk_bte_boo_code") REFERENCES "books"("boo_code") ON DELETE RESTRICT ON UPDATE CASCADE;
