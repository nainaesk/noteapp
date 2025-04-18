import { appDirectoryName, fileEncoding } from '@shared/constants';
import { NoteInfo } from '@shared/models';
import { GetNotes, ReadNote } from '@shared/types';
import { ensureDir, readdir, readFile, stat } from 'fs-extra';
import { console } from 'inspector';
import { homedir } from "os";

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
    console.log('readNote', fileName);
    const rootDir = getRootDir();

    return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding });
}