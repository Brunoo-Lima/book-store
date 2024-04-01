-- CreateTable
CREATE TABLE "Book_Category" (
    "bte_id" TEXT NOT NULL,
    "fk_bte_cte_id" TEXT NOT NULL,
    "fk_bte_boo_code" TEXT NOT NULL,

    CONSTRAINT "Book_Category_pkey" PRIMARY KEY ("bte_id")
);

-- AddForeignKey
ALTER TABLE "Book_Category" ADD CONSTRAINT "Book_Category_fk_bte_cte_id_fkey" FOREIGN KEY ("fk_bte_cte_id") REFERENCES "categories"("cte_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_Category" ADD CONSTRAINT "Book_Category_fk_bte_boo_code_fkey" FOREIGN KEY ("fk_bte_boo_code") REFERENCES "books"("boo_code") ON DELETE RESTRICT ON UPDATE CASCADE;
