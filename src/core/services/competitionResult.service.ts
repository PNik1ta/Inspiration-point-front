import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CreateCompetitionResultDto } from "../dto/create-competition-result.dto";
import { Observable } from "rxjs";
import { BaseResponse } from "../models/base-response";
import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { UpdateCompetitionResultDto } from "../dto/update-competition-result.dto";

@Injectable({ providedIn: 'root' })
export class CompetitionResultService {
  constructor(
    private readonly http: HttpClient
  ) {}

  create(dto: CreateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult';
    return this.http.post<BaseResponse<ICompetitionResult>>(url, dto);
  }

  findAll(): Observable<BaseResponse<ICompetitionResult[]>> {
    let url: string = '/api/competitionResult';
    return this.http.get<BaseResponse<ICompetitionResult[]>>(url);
  }

  findById(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.get<BaseResponse<ICompetitionResult>>(url);
  }

  delete(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.delete<BaseResponse<ICompetitionResult>>(url);
  }

  update(id: string, dto: UpdateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.put<BaseResponse<ICompetitionResult>>(url, dto);
  }

  shouldAddOrUpdate(data: ICompetitionResult): void {
  }
}