class GroupPricingDomain {
    constructor(
        public grp_type_pricing: string,
        public grp_max_pricing: number,
        public grp_min_pricing: number
    ) {}
}

export { GroupPricingDomain };
