import React, { useEffect, useRef } from 'react';
import MangaCard from './MangaCard';

interface IProps{
    mangas: IManga[]
    message?: string
    hasNextPage: boolean
    lastPageNum: number
    setLastPageNum: (lastPageNum: number) => void
}

export default function MangaGrid(props: IProps) {
    const {
        mangas, message, hasNextPage, lastPageNum, setLastPageNum,
    } = props;
    let mapped;
    const lastManga = useRef<HTMLInputElement>();

    const scrollHandler = () => {
        if (lastManga.current) {
            const rect = lastManga.current.getBoundingClientRect();
            if (((rect.y + rect.height) / window.innerHeight < 2) && hasNextPage) {
                setLastPageNum(lastPageNum + 1);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, true);
        return () => {
            window.removeEventListener('scroll', scrollHandler, true);
        };
    }, [hasNextPage, mangas]);

    if (mangas.length === 0) {
        mapped = <h3>{message}</h3>;
    } else {
        mapped = mangas.map((it, idx) => {
            if (idx === mangas.length - 1) {
                return <MangaCard manga={it} ref={lastManga} />;
            }
            return <MangaCard manga={it} />;
        });
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gridGap: '1em' }}>
            {mapped}
        </div>
    );
}

MangaGrid.defaultProps = {
    message: 'loading...',
};
