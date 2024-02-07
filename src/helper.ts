import { Response } from 'express';
import logger from './logger';

const dictionary: { [key: string]: number } = {};

const saveInDictionary = (word: string): void => {
  dictionary[word] = dictionary[word] ? dictionary[word] + 1 : 1;
  logger.info(`Saved phrase ${word} in dictionary`);
};

const joinWord = (words: string[][], word: string): void => {
  const lastRow = words[words.length - 1] || [];
  const nextRow = [];

  for (let i = 0; i < lastRow.length; i++) {
    const col = lastRow[i];
    const newWord = `${col} ${word}`;
    saveInDictionary(newWord);
    nextRow.push(newWord);
  }
  nextRow.push(word);
  saveInDictionary(word);
  words.push(nextRow);
};

export const search = (sentence: string): void => {
  const words: string[][] = [];
  const splitSentence = sentence.toLowerCase().split(' ');
  splitSentence.forEach((word) => {
    joinWord(words, word);
  });
};

export const analyze = (phrase: string): number => {
  return dictionary[phrase.toLowerCase()] || 0;
};

export const successResponse = (res: Response, data: { [key: string]: any }) => {
  res.status(200).json(data);
};

export const badRequestError = (res: Response, message: string) => {
  res.status(400).json({ message });
};