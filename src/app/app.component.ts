import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type QuoteResponse = {
  content: string;
  author: string;
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuote();
  }

  fetchQuote(): void {
    this.loading = true;
    this.error = null;

    // Public quotes API (no key required)
    const url = 'https://api.quotable.io/random';

    this.http.get<QuoteResponse>(url).subscribe({
      next: (res) => {
        this.quote = { text: res.content, author: res.author };
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load a quote right now. Please try again.';
        this.loading = false;
      },
    });
  }
}
