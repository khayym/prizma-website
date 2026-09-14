import type { ScreenSet } from "./screens";
import webProcesses from "../../images/screens/en/web-processes.jpg";
import webHr from "../../images/screens/en/web-hr.jpg";
import webIsg from "../../images/screens/en/web-isg.jpg";
import webEquipment from "../../images/screens/en/web-equipment.jpg";
import webErp from "../../images/screens/en/web-erp.jpg";
import mobileHome from "../../images/screens/en/mobile-home.jpg";
import mobileMenu from "../../images/screens/en/mobile-menu.jpg";
import mobileProcesses from "../../images/screens/en/mobile-processes.jpg";
import mobileHr from "../../images/screens/en/mobile-hr.jpg";
import mobileIsg from "../../images/screens/en/mobile-isg.jpg";
import mobileEquipment from "../../images/screens/en/mobile-equipment.jpg";
import mobileErp from "../../images/screens/en/mobile-erp.jpg";

const en: ScreenSet = {
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

export default en;
