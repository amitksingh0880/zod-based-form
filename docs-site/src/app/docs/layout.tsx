import DocsSidebar from '@/components/docs-sidebar';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-black min-h-screen">
            <DocsSidebar />
            <div className="flex-1 md:pl-64">
                <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20 lg:px-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
