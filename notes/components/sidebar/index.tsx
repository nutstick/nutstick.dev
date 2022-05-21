import { FiSearch, FiEdit, FiXCircle } from 'react-icons/fi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { queryState, searchingState } from 'atoms/sidebar';
import styles from './styles.module.css';
import { notesValue } from 'atoms/notes';
import Link from 'next/link';

const Sidebar = () => {
  const [searching, setSearching] = useRecoilState(searchingState);
  const [query, setQuery] = useRecoilState(queryState);
  const notes = useRecoilValue(notesValue);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {searching ? (
          <div className={styles.button}>
            <FiSearch />
            <input
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <FiXCircle />
          </div>
        ) : (
          <>
            <button
              className={styles.button}
              onClick={() => setSearching((v) => !v)}
            >
              <FiSearch />
              <span>Search Notes</span>
            </button>
            <FiEdit />
          </>
        )}
      </div>
      <div className={styles.content}>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link href={{ pathname: '/' + note.slug }}>
                <a>
                  {note.title}
                  <p>{note.excerpt}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
