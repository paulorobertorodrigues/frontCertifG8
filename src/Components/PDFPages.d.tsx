declare module '../src/Components/PDFPages' {
    export interface PDFPageProps {
        title: string;
        content: string;
    }

    export function renderPDFPage(props: PDFPageProps): JSX.Element;
}
