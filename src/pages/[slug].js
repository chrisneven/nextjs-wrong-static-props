import Link from "next/link";
import { useRouter } from "next/router";

const paths = [{ params: { slug: "foo" } }, { params: { slug: "bar" } }];

export default function Slug({ title, slug }) {
    const router = useRouter();

    return (
        <div>
            <h1>{title}</h1>
            <Link href={slug === "foo" ? "/bar" : "/foo"}>
                <a>Go to {slug === "foo" ? "bar" : "foo"}</a>
            </Link>

            <button
                onClick={() => {
                    router.query[slug] = "test";
                    router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                            },
                        },
                        undefined,
                        { shallow: true }
                    );
                }}
            >
                Set param
            </button>
        </div>
    );
}

export async function getStaticPaths() {
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return {
        props: {
            title: params.slug === "foo" ? "Foo" : "Bar",
            slug: params.slug,
        },
    };
}
