import type { ScreenSet } from "./screens";
import webProcesses from "../../images/screens/tr/web-processes.jpg";
import webHr from "../../images/screens/tr/web-hr.jpg";
import webIsg from "../../images/screens/tr/web-isg.jpg";
import webEquipment from "../../images/screens/tr/web-equipment.jpg";
import webErp from "../../images/screens/tr/web-erp.jpg";
import mobileHome from "../../images/screens/tr/mobile-home.jpg";
import mobileMenu from "../../images/screens/tr/mobile-menu.jpg";
import mobileProcesses from "../../images/screens/tr/mobile-processes.jpg";
import mobileHr from "../../images/screens/tr/mobile-hr.jpg";
import mobileIsg from "../../images/screens/tr/mobile-isg.jpg";
import mobileEquipment from "../../images/screens/tr/mobile-equipment.jpg";
import mobileErp from "../../images/screens/tr/mobile-erp.jpg";

const tr: ScreenSet = {
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

export default tr;
