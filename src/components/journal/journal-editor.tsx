import { Plate, usePlateEditor } from 'platejs/react';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { entryDefaultValue } from '@/constants';
import { EditorKit } from '../editor/editor-kit';

type Props = {
    onChange: (value: string) => void;
    value: string;
    mode: 'create' | 'update' | 'view';
};

const JournalEditor = ({ onChange, value }: Props) => {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: value ? JSON.parse(value) : entryDefaultValue,
    });

    return (
        <Plate
            editor={editor}
            onChange={({ value: newValue }) => {
                onChange(JSON.stringify(newValue));
            }}
        >
            <EditorContainer variant={'demo'}>
                <Editor placeholder="Write your journal entry..." />
            </EditorContainer>
        </Plate>
    );
};

export default JournalEditor;
