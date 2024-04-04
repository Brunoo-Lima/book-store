class BookDomain {
    constructor(
        public boo_title: string,
        public boo_author: string,
        public boo_publisher: string,
        public boo_year: number,
        public boo_status: string,
        public boo_justify_status: string,
        public boo_category_change: string,
        public boo_bar_code: string,
        public boo_price_acquisition: number,
        public boo_edition: string,
        public boo_ISBN: string,
        public boo_pages: number,
        public boo_synopsis: string,
        public boo_width: number,
        public boo_height: number,
        public boo_weight: number,
        public boo_depth: number,
        public fk_boo_grp_id: string
    ) {}
}

export { BookDomain };
