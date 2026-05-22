export type Sermon = {
  id: string
  title: string
  preacher: string
  scripture: string | null
  sermon_date: string
  file_url: string
  file_name: string
  duration_sec: number | null
  description: string | null
  created_at: string
  created_by: string | null
}
