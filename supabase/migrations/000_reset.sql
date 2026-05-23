-- ============================================================
-- 전체 초기화 스크립트
-- ============================================================
-- ⚠️  주의: 이 파일을 실행하면 모든 데이터가 삭제됩니다.
--
-- 실행 순서:
--   1. 이 파일 (000_reset.sql) 전체 실행
--   2. 001_initial_schema.sql 전체 실행
--
-- Storage 파일(버킷 내 오디오 파일)은 SQL로 삭제되지 않습니다.
-- 필요시 Supabase 대시보드 → Storage → sermons 버킷에서 직접 삭제하세요.
-- ============================================================

-- Storage RLS 정책 삭제
DROP POLICY IF EXISTS "인증 사용자 업로드" ON storage.objects;
DROP POLICY IF EXISTS "공개 읽기" ON storage.objects;
DROP POLICY IF EXISTS "본인 파일 삭제" ON storage.objects;

-- sermons 테이블 삭제 (RLS 정책·GRANT 포함)
DROP TABLE IF EXISTS sermons CASCADE;
