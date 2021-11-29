import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Select,
  Checkbox,
} from "semantic-ui-react";

const AddHostaModal = ({
  triggerComponent,
  sizes,
  waterDemands,
  sunDemands,
  locations,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerComponent}
        centered
        size="small"
      >
        <Modal.Header>Přidání nové hosty</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Field control={Input} label="Název" />
                <Form.Field
                  control={Select}
                  label="Velikost"
                  placeholder="Vyberte velikost..."
                  options={sizes}
                />
                <Form.Field control={Input} label="Evidenční číslo" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label="Nárok na vláhu"
                  placeholder="Vyberte nárok na vláhu..."
                  options={waterDemands}
                />
                <Form.Field
                  control={Select}
                  label="Nárok na slunce"
                  placeholder="Vyberte nárok na slunce..."
                  options={sunDemands}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label="Umístění"
                  placeholder="Vyberte umístění..."
                  options={locations}
                />
                <Form.Field control={Input} label="Datum pořízení" />
              </Form.Group>
              <Form.Group>
                <Form.Field control={Checkbox} label="Mrazuvzdornos" />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Zrušit
          </Button>
          <Button onClick={() => setOpen(false)} positive>
            Vytvořit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default AddHostaModal;
