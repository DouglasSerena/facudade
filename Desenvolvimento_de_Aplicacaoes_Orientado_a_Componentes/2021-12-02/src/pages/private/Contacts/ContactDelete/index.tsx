import { useCallback } from "react";
import { useHistory, useParams } from "react-router";
import api from "src/api";
import ModalConfirm from "src/components/ModalConfirm";
import { useToasts } from "src/context/Toasts";
import { handleTry } from "src/utils/handle-try";

function ContactDelete() {
  const { open } = useToasts();
  const { contactId } = useParams<{ contactId: string }>();
  const history = useHistory();

  const handleDelete = useCallback(async () => {
    const [data] = await handleTry(api.delete(`/contacts/${contactId}`));
    if (data) {
      history.push("/contact/list");
      open("Contato deletado", "success");
    }
  }, [contactId, history, open]);

  return (
    <ModalConfirm
      onConfirm={handleDelete}
      onCancel={() => history.push("/contact/list")}
    >
      <p>Você tem certeza que quer remover este contato?</p>
    </ModalConfirm>
  );
}

export default ContactDelete;
