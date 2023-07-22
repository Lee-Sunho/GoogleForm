import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    lightpurple: string;
    blue: string;
    lightgray: string;
    bordergray: string;
    icongray: string;
    darkpurple: string;
  }
}
