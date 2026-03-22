import React from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
    children: React.ReactNode;
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    threshold?: number;
    rootMargin?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children, hasMore, loading, onLoadMore, threshold = 0.5, rootMargin = '0px',
    }) => {

    const { ref, inView } = useInView({
        threshold,
        rootMargin,
    });

    React.useEffect(() => {
        if (inView && hasMore && !loading) {
            onLoadMore();
        }
    }, [inView, hasMore, loading, onLoadMore]);

    return (
        <>
        {children}
        {}
        <div ref={ref} style={{ height: '1px', marginTop: '-1px' }} />
        </>
    );
};