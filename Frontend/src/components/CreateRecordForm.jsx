import {Button, Input, Textarea} from "@chakra-ui/react";

function CreateRecordForm() {
    return (
        <form className="w-full flex flex-col gap-3">
            <h3 className="font-bold text-teal-400 text-xl">Создание ToDo</h3>
            <Input placeholder={"Название"} colorPalette="teal" css={{borderColor: "#004D40"}} />
            <Textarea placeholder={"Описание"} colorPalette="teal" css={{borderColor: "#004D40"}}/>
            <Button colorPalette="teal" variant="outline">Создать</Button>
        </form>
    );
}

export default CreateRecordForm;