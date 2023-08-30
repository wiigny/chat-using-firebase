import ListContacts from "./components/ListContacts";
import FooterSendConversation from "./components/FooterSendConversation";
import ListPhotos from "./components/FooterSendConversation/FormConversation/ListPhotos";
import HeaderConversation from "./components/HeaderConversation";
import HeaderUser from "./components/HeaderUser";
import ListConversation from "./components/ListConversation";
import SeeFullPhoto from "./components/SeeFullPhoto";
import styles from "./styles.module.scss";
import Wavify from "@/components/Wavify";

export default function Home() {
  return (
    <main className={styles.mainPage}>
      <section>
        <HeaderUser />

        <ListContacts />
      </section>

      <section>
        <HeaderConversation />

        <ListConversation />

        <FooterSendConversation />

        <ListPhotos />

        <SeeFullPhoto />

        <Wavify />
      </section>
    </main>
  );
}
