import type { ScreenSet } from "./screens";
import webProcesses from "../../images/screens/ru/web-processes.jpg";
import webHr from "../../images/screens/ru/web-hr.jpg";
import webIsg from "../../images/screens/ru/web-isg.jpg";
import webEquipment from "../../images/screens/ru/web-equipment.jpg";
import webErp from "../../images/screens/ru/web-erp.jpg";
import mobileHome from "../../images/screens/ru/mobile-home.jpg";
import mobileMenu from "../../images/screens/ru/mobile-menu.jpg";
import mobileProcesses from "../../images/screens/ru/mobile-processes.jpg";
import mobileHr from "../../images/screens/ru/mobile-hr.jpg";
import mobileIsg from "../../images/screens/ru/mobile-isg.jpg";
import mobileEquipment from "../../images/screens/ru/mobile-equipment.jpg";
import mobileErp from "../../images/screens/ru/mobile-erp.jpg";

const ru: ScreenSet = {
  web: {
    processes: webProcesses,
    hr: webHr,
    isg: webIsg,
    equipment: webEquipment,
    erp: webErp,
  },
  mobile: {
    home: mobileHome,
    menu: mobileMenu,
    processes: mobileProcesses,
    hr: mobileHr,
    isg: mobileIsg,
    equipment: mobileEquipment,
    erp: mobileErp,
  },
};

export default ru;
