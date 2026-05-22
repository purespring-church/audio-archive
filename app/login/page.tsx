// TODO: Supabase Auth 연결 후 실제 로그인 기능 구현

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">로그인</h1>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            placeholder="이메일 주소"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>

        {/* TODO: Supabase Auth signInWithPassword 연결 */}
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 py-2 text-sm text-white hover:bg-gray-700"
        >
          로그인
        </button>
      </form>
    </div>
  )
}
