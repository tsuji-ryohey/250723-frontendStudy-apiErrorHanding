import Image from 'next/image';
import {
  API_ENDPOINT,
  API_STATUS,
  CAT_API_SLUGS,
  POKEMON_API_SLUGS,
} from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';
import { getApiCatImage } from '@/lib/api/logics/getApiCatImage';
import { getApiPokemonPokemon } from '@/lib/api/logics/getApiPokemonPokemon';

export default async function Page() {
  /**
   * 1. getApi() を使ってAPIを呼び出してみよう
   * 5. エンドポイントのidやドメインを変更して意図的にエラーを発生させてみよう
   * 8. 猫画像取得専用API呼び出し関数 lib/api/logics/getApiCatImage.ts を作成してみよう
   */
  const catApiResponse = await getApi(API_ENDPOINT.CAT_IMAGE, {
    slugs: {[CAT_API_SLUGS.ID]: 'MTUzNjQwNw' }
  });
  console.log("catApiResponse", catApiResponse)

  /**
   * 2. status から成功したかどうかを判別し変数に格納してみよう
   */
  const isCatOK = catApiResponse.status === API_STATUS.OK;
  const image = isCatOK ? catApiResponse.data : []
  console.log('isCatOK', isCatOK)


  /**
   * 6. APIエラーのときだけエラーメッセージを変数に格納
   */
  const isCatApiError = catApiResponse.status === API_STATUS.API_ERROR
  const catApiResponseErrorMessage = (isCatApiError && catApiResponse.data?.message)

  /**
   * 9. Pokémon API を使ってポケモンの画像をエラーハンドリングしつつ表示するセクションを追加してみよう
   * 10. ポケモン取得専用API呼び出し関数 lib/api/logics/getApiPokemonPokemon.ts を作成してみよう
   */

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-bold">API Error Handling</h1>
      <section className="p-6">
        <h2 className="text-2xl font-bold">Cat</h2>
        {/* 3. 成功しているときだけ猫の画像を表示してみよう */}
        { isCatOK && <div><img src={catApiResponse.data.url} width={catApiResponse.data.width} height={catApiResponse.data.height} alt="" /></div> }
        {/* 4. 失敗しているときだけ代替画像を表示してみよう */}
        { !isCatOK && <Image src="/assets/noimage.png" width="256" height="256" alt="No image" /> }
        {/* 7. エラーメッセージを表示 */}
        { isCatApiError&&catApiResponseErrorMessage && <p>{catApiResponseErrorMessage}</p> }
      </section>

      {/* 9. Pokémon API を使ってポケモンの画像をエラーハンドリングしつつ表示するセクションを追加してみよう */}
    </main>
  );
}
