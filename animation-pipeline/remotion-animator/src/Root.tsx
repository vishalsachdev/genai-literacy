import { Composition } from "remotion";
import { ExcalidrawAnimation } from "./ExcalidrawAnimation";
import { AutocompleteMetaphor } from "./AutocompleteMetaphor";
import { IterationCycle } from "./IterationCycle";
import { PrivacyBoundary } from "./PrivacyBoundary";
import { SourceGrounded } from "./SourceGrounded";
import { PromptStructure } from "./PromptStructure";
import { TwoToolModel } from "./TwoToolModel";
import { SustainabilityBalance } from "./SustainabilityBalance";

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
      <Composition
        id="AutocompleteMetaphor"
        component={AutocompleteMetaphor}
        durationInFrames={360} // 12 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="IterationCycle"
        component={IterationCycle}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PrivacyBoundary"
        component={PrivacyBoundary}
        durationInFrames={270} // 9 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SourceGrounded"
        component={SourceGrounded}
        durationInFrames={330} // 11 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PromptStructure"
        component={PromptStructure}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SustainabilityBalance"
        component={SustainabilityBalance}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="TwoToolModel"
        component={TwoToolModel}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
