import { selector, selectorFamily } from 'recoil';
import type { ID, Note } from 'interfaces';
import { queryState } from './sidebar';

export const notesValue = selector<Note[]>({
  key: 'Notes',
  get: async ({ get }) => {
    const posts = [
      {
        id: 0,
        title: '2022-5-21',
        slug: '2022-5-21',
        excerpt: 'Veniam aliqua enim magna irure irure aliqua amet',
        content:
          'Veniam aliqua enim magna irure irure aliqua amet labore dolor proident fugiat. Voluptate elit ullamco id non ex anim id sunt aute enim. Eiusmod minim elit deserunt sunt mollit ullamco ut consequat nostrud Lorem fugiat irure pariatur. Aliquip nisi eiusmod sit Lorem qui ullamco proident minim cupidatat. Enim elit consectetur officia commodo. Ut non labore laborum ea deserunt ad enim magna do id. Tempor esse voluptate duis fugiat.\nPariatur velit in aliquip reprehenderit. Qui qui qui eu reprehenderit nulla magna laboris est nulla. Consequat amet nulla cupidatat id veniam pariatur. Cillum ipsum laboris eu ex. Sunt ea Lorem Lorem cupidatat cupidatat aliqua veniam magna. Incididunt consectetur aute Lorem sunt dolore pariatur deserunt. Reprehenderit laborum velit do amet.\nProident do in culpa pariatur occaecat. Amet laborum adipisicing laborum dolore. Laborum dolor ea nostrud amet amet velit et sit enim mollit ex nisi incididunt qui.',
      },
      {
        id: 1,
        title: '2022-5-20',
        slug: '2022-5-20',
        excerpt: 'Ullamco sunt aliquip velit occaecat aute. Exercitation',
        content:
          'Ullamco sunt aliquip velit occaecat aute. Exercitation aute non consequat officia minim nulla elit quis ad. Proident voluptate ut veniam proident proident esse voluptate cupidatat nulla. Ut et laborum id incididunt duis duis eiusmod nulla ex nulla dolor dolore esse irure. Do occaecat do non nulla adipisicing qui Lorem incididunt ut ullamco exercitation aute deserunt ex.\nSint ut ullamco duis incididunt laboris occaecat do ipsum exercitation dolore ut enim deserunt. Cupidatat reprehenderit dolor laborum aliqua. Ad duis commodo ex ut do tempor sint consequat cupidatat quis adipisicing. Laboris ad fugiat qui do nulla laboris. Commodo ut dolore consectetur proident exercitation deserunt proident ad.',
      },
      {
        id: 2,
        title: '2022-5-19',
        slug: '2022-5-19',
        excerpt: 'Proident adipisicing aliqua esse elit mollit reprehenderit',
        content:
          'Proident adipisicing aliqua esse elit mollit reprehenderit adipisicing Lorem eu excepteur. Irure pariatur non amet ex qui eu ea dolor ullamco amet. Proident deserunt adipisicing non irure do aliquip cupidatat non laboris do aliqua exercitation proident. Elit elit id sit duis sit tempor proident culpa ex non velit. Duis non est est tempor sit. Velit anim laborum incididunt adipisicing culpa ut dolor labore laborum anim ea velit proident.\nLaborum proident eiusmod aliquip magna magna est. Laborum deserunt labore mollit excepteur aliqua nulla commodo tempor cillum tempor in occaecat. Et incididunt sit qui et laborum reprehenderit commodo veniam. Aute dolor deserunt cillum in exercitation labore consectetur quis labore sit irure ex. Eiusmod voluptate consequat id veniam laborum aliquip incididunt irure ex aliquip nostrud sit id.\nEx eiusmod eu incididunt incididunt cupidatat. Laborum eiusmod labore proident minim occaecat velit exercitation esse occaecat culpa incididunt ea eu esse. Velit id cillum eiusmod et. Pariatur quis ullamco non dolore non eu. Eiusmod excepteur nostrud exercitation dolor dolore et ut enim consectetur incididunt qui nulla occaecat dolore. Consectetur dolor officia consectetur nostrud anim laborum ex amet voluptate eiusmod cupidatat proident aliqua.',
      },
      {
        id: 3,
        title: '2022-5-10',
        slug: '2022-5-10',
        excerpt: 'Deserunt officia occaecat ut nulla esse nisi',
        content:
          'Deserunt officia occaecat ut nulla esse nisi sit. Mollit anim excepteur enim amet veniam cupidatat ea incididunt velit ipsum laboris consectetur reprehenderit proident. Eu velit ipsum velit sunt ex adipisicing occaecat officia commodo ex cupidatat. Eiusmod Lorem qui mollit Lorem adipisicing labore sit. Anim ullamco incididunt consequat exercitation voluptate tempor.\nLabore quis ullamco elit magna do aliqua sint mollit magna sint. Enim nostrud esse aute irure nostrud pariatur minim laboris proident. Deserunt consequat laboris consequat enim commodo laboris nisi dolore eu sint pariatur velit aute dolore. Est nostrud in voluptate deserunt eu sint in ea fugiat reprehenderit. Amet adipisicing officia sint culpa.\nAdipisicing nulla laboris enim deserunt quis laboris irure qui exercitation aliqua id mollit. Minim eiusmod non eu sint nostrud et qui ea id laborum aute fugiat nostrud ex. Consequat minim in reprehenderit irure ullamco non culpa cupidatat deserunt elit. Non ut eiusmod nostrud aute enim ipsum sit. Laboris consequat dolore proident exercitation aute veniam. Labore esse id sint adipisicing exercitation qui velit pariatur cupidatat consequat do et.',
      },
      {
        id: 4,
        title: '2022-5-09',
        slug: '2022-5-09',
        excerpt: 'Lorem cupidatat laboris sunt excepteur duis dolore',
        content:
          'Lorem cupidatat laboris sunt excepteur duis dolore adipisicing. Ex adipisicing minim aliquip cillum. Amet exercitation aute quis velit in aliqua.\nCommodo ullamco aute dolor irure magna fugiat. Deserunt enim deserunt dolore ipsum nostrud commodo consequat ex nisi ad adipisicing veniam. Magna sint cillum pariatur duis do exercitation. Anim veniam culpa ullamco irure non pariatur dolore elit. Nostrud voluptate laboris proident adipisicing in reprehenderit nisi in elit. Laborum culpa labore cupidatat laborum anim sunt eiusmod adipisicing elit mollit est voluptate irure. Aute et consectetur aliquip ut officia fugiat cupidatat dolore eu quis exercitation veniam ut.',
      },
    ];

    const query = get(queryState);

    return posts.filter(({ content, title }) =>
      `${title}${content}`.match(new RegExp(query))
    );
  },
});

export const noteValue = selectorFamily({
  key: 'Note',
  get:
    (slug: string) =>
    ({ get }) => {
      return get(notesValue).find((note) => note.slug === slug);
    },
});
