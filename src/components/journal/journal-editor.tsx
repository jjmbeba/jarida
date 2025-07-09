import { Plate, usePlateEditor } from 'platejs/react';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { entryDefaultValue } from '@/constants';
import { EditorKit } from '../editor/editor-kit';

type Props = {
    onChange: (value: string) => void;
};

const JournalEditor = ({ onChange }: Props) => {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: entryDefaultValue,
    });

    return (
        <Plate editor={editor} onChange={({ value }) => {
            onChange(JSON.stringify(value))
        }}>
            <EditorContainer variant={'demo'}>
                <Editor placeholder="Write your journal entry..." />
            </EditorContainer>
        </Plate>
    );
};

export default JournalEditor;
