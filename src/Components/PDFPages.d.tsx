import '../Components/PDFPages.d';


declare module '../Components/PDFPages.d' {
    export interface PDFPageProps {
        title: string;
        content: string;
    }

    export function renderPDFPage(props: PDFPageProps): JSX.Element;
}