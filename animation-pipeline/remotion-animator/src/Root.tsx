import { Composition } from "remotion";
import { ExcalidrawAnimation } from "./ExcalidrawAnimation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ExcalidrawAnimation"
        component={ExcalidrawAnimation}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          excalidrawPath: "",
        }}
      />
    </>
  );
};
