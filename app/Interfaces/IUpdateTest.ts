export default interface UpdateTestDto {
  uuid: string
  slug?: string
  title?: string
  type?: string
  duration?: number
  duration_unit?: string
  active?: boolean
  overall_score: number
  passing_score: number
  grade?: string
  max_trials?: number
  testable_id?: string
  testable_type?: string
}
