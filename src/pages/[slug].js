import Link from "next/link";
import { useRouter } from "next/router";

const paths = [{ params: { slug: "foo" } }, { params: { slug: "bar" } }];

export default function Slug({ title, slug }) {
    const router = useRouter();

    return (
        <div>
            <h1>{title}</h1>
            <h2>{slug}</h2>
            <Link href={slug === "foo" ? "/bar" : "/foo"}>
                Go to {slug === "foo" ? "Bar" : "Foo"}
            </Link>

            <button
                onClick={() => {
                    router.query[slug] = "test";
                    router.replace(
                        {
                            pathname: router.pathname,
                            query: router.query,
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
    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
    return {
        props: {
            key: params.slug,
            title: params.slug === "foo" ? "Foo" : "Bar",
            slug: params.slug,
        },
    };
}
