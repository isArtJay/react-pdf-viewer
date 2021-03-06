/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React, { useEffect, useState } from 'react';

import PdfJs from '../vendors/PdfJs';

interface AnnotationLayerProps {
    page: PdfJs.Page;
    renderAnnotations(annotations: PdfJs.Annotation[]): React.ReactElement;
}

interface Status {
    loading: boolean;
    annotations: PdfJs.Annotation[];
}

const AnnotationLoader: React.FC<AnnotationLayerProps> = ({ page, renderAnnotations }) => {
    const [status, setStatus] = useState<Status>({
        loading: true,
        annotations: [],
    })

    useEffect(() => {
        page.getAnnotations({ intent: 'display' }).then((result) => {
            setStatus({
                loading: false,
                annotations: result,
            });
        });
    }, []);

    return (
        status.loading
            ? <></>
            : renderAnnotations(status.annotations)
    );
};

export default AnnotationLoader;
