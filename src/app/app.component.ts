import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type QuoteResponse = {
  quote: string;
  author: string;
  id: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Prompt-Powered Kickstart: Angular';

  loading = false;
  error: string | null = null;

  quote: { text: string; author: string } | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchQuote();
  }

  fetchQuote(): void {
    this.loading = true;
    this.error = null;

    const url = 'https://dummyjson.com/quotes/random';

    this.http.get<QuoteResponse>(url).subscribe({
      next: (res) => {
        this.quote = { text: res.quote, author: res.author };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load a quote right now. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
