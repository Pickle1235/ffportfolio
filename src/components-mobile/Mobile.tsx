import TopMenu from './TopMenu.tsx';
import MainColumn from './MainColumn.tsx';
import DraggableWindowMobile from './DraggableWindowMobile.tsx';
import BottomButtons from './BottomButtons.tsx';

export default function Mobile({
  onClickCloseWindow,
  windowContent,
  windowTitle,
  muted,
  loading,
  onClickContentType,
  onChangeMuted,
  contentType,
}: {
  onClickCloseWindow?: () => void;
  windowContent: string[];
  windowTitle: string;
  muted: boolean;
  loading: boolean;
  onClickContentType?: (type: string) => void;
  onChangeMuted?: (type: boolean) => void;
  contentType: string;
}) {
  return (
    <div className="mobile-div">
      {loading && (
        <div className="loading-text-div">
          <a className="loading-text">Loading...</a>
        </div>
      )}
      {!loading && (
        <div>
          <div className="bottom-mobile">
            <BottomButtons muted={muted} />
          </div>
          <div className="main-mobile">
            <div className="top-mobile">
              <TopMenu
                muted={muted}
                onChangeMuted={onChangeMuted}
                onClickContentType={onClickContentType}
                contentType={contentType}
              />
            </div>
          </div>
          <div className="main-column">
            <MainColumn muted={muted} />
          </div>
          {windowContent.length > 0 && (
            <DraggableWindowMobile
              muted={muted}
              onClickCloseWindow={onClickCloseWindow}
              windowContent={windowContent}
              windowTitle={windowTitle}
            />
          )}
        </div>
      )}
    </div>
  );
}
