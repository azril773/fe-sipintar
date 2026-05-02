import { Base, UUID } from "./common";

export type KaihAspect = Base & {
  id: UUID;
  name: string;
  description: string | null;
  sequence_no: number;
};

export type KaihIndicator = Base & {
  id: UUID;
  aspect_id: UUID;
  description: string;
  rubric: string | null;
  active_flag: boolean;
};
