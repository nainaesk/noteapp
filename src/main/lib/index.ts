import { appDirectoryName, fileEncoding } from '@shared/constants';
import { NoteInfo } from '@shared/models';
import { GetNotes, ReadNote, WriteNote } from '@shared/types';
import { dialog } from 'electron';
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra';
import { console } from 'inspector';
import { homedir } from "os";
import path from 'path';

export const getRootDir = () => {
    const rootDir = `${homedir()}/${appDirectoryName}`;
    return rootDir;
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    });

    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

    return Promise.all(notes.map(getNoteInfoFromFileName));
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${fileName}`)

    return {
        title: fileName.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs,
    }
}

export const readNote: ReadNote = async (fileName: string) => {
    const rootDir = getRootDir();

    return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding });
}

export const writeNote: WriteNote = async (fileName: string, content: string) => {
    const rootDir = getRootDir();

    console.info(`Writing note ${fileName} to ${rootDir}/${fileName}.md`);
    return writeFile(`${rootDir}/${fileName}.md`, content, { encoding: fileEncoding });
}

export const createNote = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'Create a new note',
        defaultPath: `${rootDir}/new-note.md`,
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [
            {
                name: 'Markdown Files',
                extensions: ['md']
            }
        ]
    });

    if (canceled || !filePath) {
        console.info('User canceled the note creation');
        return false;
    }

    const { name: fileName, dir: parentDir } = path.parse(filePath);

    if (parentDir !== rootDir) {
        await dialog.showMessageBox({
            type: 'error',
            title: 'Creation failed',
            message: `Notes must be created in the ${rootDir} directory. Avoid using other directories.`,
        });

        return false;
    }
    console.info(`Creating note ${fileName} in ${filePath}`);
    await writeFile(filePath, '');

    return fileName

}