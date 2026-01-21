import Header from "@components/header"
import AddClassroomForm from "@components/classroom/AddClassroomForm"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useEffect, useState } from "react"
import { User } from "@types"
import { useRouter } from "next/router"

const AddClassroom: React.FC = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null')
        setLoggedInUser(user)
        setIsLoading(false)

        if (!user || user.role !== 'admin') {
            // Redirect or show error - showing error message is better per requirements
        }
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <>
                <Head>
                    <title>{t("classroom.title")}</title>
                </Head>
                <Header />
                <main>
                    <section className="flex flex-col justify-center">
                        <div className="max-w-sm m-auto">
                            <div className="text-red-800 text-center">
                                {t('classroom.error.unauthorized')}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{t("classroom.title")}</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    <AddClassroomForm />
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { locale } = context

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    }
}

export default AddClassroom