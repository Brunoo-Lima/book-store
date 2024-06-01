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
    "boo_id" TEXT NOT NULL,
    "boo_code" TEXT NOT NULL,
    "boo_title" TEXT NOT NULL,
    "boo_year" INTEGER NOT NULL,
    "boo_status" TEXT NOT NULL,
    "boo_justify_status" TEXT NOT NULL,
    "boo_category_change" TEXT NOT NULL,
    "boo_bar_code" TEXT NOT NULL,
    "boo_price_acquisition" DOUBLE PRECISION NOT NULL,
    "boo_cost_product" DOUBLE PRECISION NOT NULL,
    "boo_edition" TEXT NOT NULL,
    "boo_publisher" TEXT NOT NULL,
    "boo_ISBN" TEXT NOT NULL,
    "boo_pages" INTEGER NOT NULL,
    "boo_synopsis" TEXT NOT NULL,
    "boo_width" DOUBLE PRECISION NOT NULL,
    "boo_height" DOUBLE PRECISION NOT NULL,
    "boo_weight" DOUBLE PRECISION NOT NULL,
    "boo_depth" DOUBLE PRECISION NOT NULL,
    "fk_boo_grp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("boo_id")
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
CREATE TABLE "categories" (
    "cte_id" TEXT NOT NULL,
    "cte_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("cte_id")
);

-- CreateTable
CREATE TABLE "logsChanged" (
    "log_id" TEXT NOT NULL,
    "log_description" TEXT NOT NULL,
    "fk_log_boo_code" TEXT NOT NULL,
    "fk_log_use_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logsChanged_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "groupPricing" (
    "grp_id" TEXT NOT NULL,
    "grp_type" TEXT NOT NULL,
    "grp_percent" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupPricing_pkey" PRIMARY KEY ("grp_id")
);

-- CreateTable
CREATE TABLE "_BooksToCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorsToBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "books_boo_code_key" ON "books"("boo_code");

-- CreateIndex
CREATE UNIQUE INDEX "books_boo_title_key" ON "books"("boo_title");

-- CreateIndex
CREATE UNIQUE INDEX "books_boo_ISBN_key" ON "books"("boo_ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "authors_aut_name_key" ON "authors"("aut_name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_cte_name_key" ON "categories"("cte_name");

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToCategories_AB_unique" ON "_BooksToCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToCategories_B_index" ON "_BooksToCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorsToBooks_AB_unique" ON "_AuthorsToBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorsToBooks_B_index" ON "_AuthorsToBooks"("B");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_fk_boo_grp_id_fkey" FOREIGN KEY ("fk_boo_grp_id") REFERENCES "groupPricing"("grp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logsChanged" ADD CONSTRAINT "logsChanged_fk_log_boo_code_fkey" FOREIGN KEY ("fk_log_boo_code") REFERENCES "books"("boo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logsChanged" ADD CONSTRAINT "logsChanged_fk_log_use_id_fkey" FOREIGN KEY ("fk_log_use_id") REFERENCES "users"("use_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToCategories" ADD CONSTRAINT "_BooksToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("boo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToCategories" ADD CONSTRAINT "_BooksToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("cte_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsToBooks" ADD CONSTRAINT "_AuthorsToBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "authors"("aut_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsToBooks" ADD CONSTRAINT "_AuthorsToBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "books"("boo_id") ON DELETE CASCADE ON UPDATE CASCADE;
