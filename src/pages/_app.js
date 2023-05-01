import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        router.beforePopState((props) => {
            console.log("beforePopState", props);
            // router.reload()
            return false;
        });
    }, [router]);
    return <Component key={pageProps.slug} {...pageProps} />;
}
