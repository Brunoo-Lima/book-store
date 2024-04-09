interface AuthorDomainProps {
    name: string;
}

export class AuthorDomain {
    private props: AuthorDomainProps;

    constructor(props: AuthorDomainProps) {
        this.props = props;
    }

    get name() {
        return this.props.name;
    }
}
