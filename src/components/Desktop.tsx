import RightColumn from './RightColumn.tsx'
import LeftColumn from './LeftColumn.tsx'
import DraggableWindow from './DraggableWindow.tsx'

export default function Desktop({ onClickCloseWindow, windowContent, windowTitle, muted, loading, onClickContentType, onChangeMuted, contentType } : 
                                { onClickCloseWindow? : () => void, windowContent : string[], windowTitle : string, muted : boolean, loading : boolean, 
                                    onClickContentType? : (type: string) => void, onChangeMuted? : (type: boolean) => void, contentType : string }) {
    return (
        <div>
            {loading && 
                <div className='loading-text-div'>
                    <a className='loading-text'>
                        Loading...
                    </a>
                </div>
            }
            {!loading && <div>
                <div className="main">
                    <div className="left">
                        <LeftColumn muted={muted}/>
                    </div>
                    <div className="center">
                    </div>
                    {
                        windowContent.length > 0 && 
                        <DraggableWindow
                            muted={muted}
                            onClickCloseWindow={onClickCloseWindow}
                            windowContent={windowContent}
                            windowTitle={windowTitle}
                        />
                    }
                    <div className="right">
                        <RightColumn
                            muted={muted}
                            onChangeMuted={onChangeMuted}
                            onClickContentType={onClickContentType}
                            contentType={contentType}
                        />
                    </div>
                </div>
            </div>}
        </div>
    )
}